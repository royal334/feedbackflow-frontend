"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import {
  Feedback,
  FeedbackStatus,
  useVoteFeedback,
  useUpdateFeedbackStatus,
  useDeleteFeedback,
} from "@/hooks/use-feedback";
import { CommentSection } from "./comment-section";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronUp, MessageSquare, Trash2 } from "lucide-react";

// Distinct color classes for each status
const STATUS_CLASSES: Record<FeedbackStatus, string> = {
  OPEN: "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-100",
  PLANNED: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50",
  INPROGRESS: "bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-50",
  COMPLETED:
    "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50",
};

const STATUS_LABELS: Record<FeedbackStatus, string> = {
  OPEN: "Open",
  PLANNED: "Planned",
  INPROGRESS: "In Progress",
  COMPLETED: "Completed",
};

export function FeedbackCard({ item }: { item: Feedback }) {
  const { data: session } = useSession();
  const [expanded, setExpanded] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const vote = useVoteFeedback();
  const updateStatus = useUpdateFeedbackStatus();
  const deleteFeedback = useDeleteFeedback();
  const hasVoted = item.votes.length > 0;

  const isAdmin = (session?.user as { role?: string })?.role === "ADMIN";

  function handleDelete() {
    deleteFeedback.mutate(item.id, {
      onSettled: () => setDeleteOpen(false),
    });
  }

  return (
    <>
      <Card className="hover:border-primary/50 transition-colors">
        <CardContent className="p-4">
          <div className="flex gap-4">
            {/* Vote button */}
            <div className="flex flex-col items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "w-8 h-8 rounded border flex items-center justify-center transition-colors p-4",
                  hasVoted
                    ? "bg-indigo-50 border-indigo-400"
                    : "border-gray-200 hover:bg-indigo-50 hover:border-indigo-300",
                )}
                onClick={() => vote.mutate(item.id)}
                disabled={vote.isPending}
              >
                <div className="flex flex-col items-center">
                  <ChevronUp className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold">{item._count.votes}</span>
                </div>
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="text-sm font-semibold text-foreground truncate">
                  {item.title}
                </h3>
                <Badge
                  variant="outline"
                  className={cn(
                    "shrink-0 text-[10px] px-2 py-0 border",
                    STATUS_CLASSES[item.status],
                  )}
                >
                  {STATUS_LABELS[item.status]}
                </Badge>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                {item.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-muted-foreground">
                    by {item.createdBy.name}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-[11px] text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                    onClick={() => setExpanded((v) => !v)}
                  >
                    <MessageSquare className="w-3 h-3" />
                    {expanded ? "Hide comments" : "Comments"}
                  </Button>
                </div>

                {/* Admin controls */}
                {isAdmin && (
                  <div className="flex items-center gap-2">
                    <Select
                      value={item.status}
                      onValueChange={(value) =>
                        updateStatus.mutate({
                          id: item.id,
                          status: value as FeedbackStatus,
                        })
                      }
                    >
                      <SelectTrigger className="h-7 text-[10px] w-[110px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="OPEN">Open</SelectItem>
                        <SelectItem value="PLANNED">Planned</SelectItem>
                        <SelectItem value="INPROGRESS">In Progress</SelectItem>
                        <SelectItem value="COMPLETED">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => setDeleteOpen(true)}
                      disabled={deleteFeedback.isPending}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Comments */}
          {expanded && (
            <div className="mt-4 pt-4 border-t">
              <CommentSection feedbackId={item.id} />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete confirmation dialog */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Delete feedback</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-medium text-foreground">
                "{item.title}"
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setDeleteOpen(false)}
              disabled={deleteFeedback.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteFeedback.isPending}
            >
              {deleteFeedback.isPending ? "Deleting…" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
