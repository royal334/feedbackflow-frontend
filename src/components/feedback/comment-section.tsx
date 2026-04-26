'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useSession } from '@/lib/auth-client'
import { useComments, useCreateComment, useDeleteComment } from '@/hooks/use-feedback'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { SendHorizontal, Trash2 } from 'lucide-react'

const commentSchema = z.object({
  content: z.string().min(1, 'Comment cannot be empty').max(500),
})

type CommentFormValues = z.infer<typeof commentSchema>

export function CommentSection({ feedbackId }: { feedbackId: string }) {
  const { data: session } = useSession()
  const { data: comments, isLoading } = useComments(feedbackId)
  const createComment = useCreateComment(feedbackId)
  const deleteComment = useDeleteComment(feedbackId)

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: '',
    },
  })

  const onSubmit = async (values: CommentFormValues) => {
    try {
      await createComment.mutateAsync(values.content.trim())
      form.reset()
    } catch (error) {
      console.error('Failed to post comment', error)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[1, 2].map(i => (
          <div key={i} className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-muted animate-pulse shrink-0" />
            <div className="flex-1 h-14 bg-muted rounded-lg animate-pulse" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-foreground/70">
        Comments {comments?.length ? `(${comments.length})` : ''}
      </p>

      {comments?.length === 0 && (
        <p className="text-xs text-muted-foreground italic">No comments yet. Be the first!</p>
      )}

      <div className="space-y-2">
        {comments?.map(comment => (
          <div key={comment.id} className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[9px] font-bold text-primary shrink-0 mt-0.5">
              {comment.user.name.charAt(0).toUpperCase() ?? 'U'}
            </div>
            <div className="flex-1 bg-muted/30 border border-muted rounded-lg px-3 py-2">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-semibold text-foreground">{comment.user.name ?? 'Unknown'}</span>
                  <span className="text-[10px] text-muted-foreground">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {session?.user.id === comment.user.id && (
                  <button
                    onClick={() => deleteComment.mutate(comment.id)}
                    className="text-[10px] text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
              <p className="text-xs text-foreground/80 leading-relaxed">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2 items-start pt-1">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex-1 space-y-0">
                <FormControl>
                  <Input
                    placeholder="Add a comment..."
                    className="text-xs h-9"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[10px] mt-1" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="sm"
            disabled={createComment.isPending || !form.watch('content').trim()}
            className="h-9 w-9 p-0 bg-indigo-600 hover:bg-indigo-700"
          >
            <SendHorizontal className="w-4 h-4" />
          </Button>
        </form>
      </Form>
    </div>
  )
}
