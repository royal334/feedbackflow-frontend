import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/axios'

export type FeedbackStatus = 'OPEN' | 'PLANNED' | 'INPROGRESS' | 'COMPLETED'

export type Feedback = {
  id: string
  title: string
  description: string
  status: FeedbackStatus
  userId: string
  createdAt: string
  createdBy: { id: string; name: string; email: string }
  _count: { votes: number }
  comments: Comment[]
}

export type Comment = {
  id: string
  content: string
  createdAt: string
  user: { id: string; name: string }
}

// --- Feedback hooks ---

export function useFeedback() {
  return useQuery({
    queryKey: ['feedback'],
    queryFn: async () => {
      const res = await api.get('/feedback')
      return res.data.data as Feedback[]
    },
  })
}

export function useCreateFeedback() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (data: { title: string; description: string }) => {
      const res = await api.post('/feedback', data)
      return res.data.data as Feedback
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['feedback'] }),
  })
}

export function useVoteFeedback() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (feedbackId: string) => {
      const res = await api.post(`/feedback/${feedbackId}/vote`)
      return res.data
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['feedback'] }),
  })
}

export function useUpdateFeedbackStatus() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: FeedbackStatus }) => {
      const res = await api.patch(`/feedback/${id}/status`, { status })
      return res.data.data as Feedback
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['feedback'] }),
  })
}

export function useDeleteFeedback() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/feedback/${id}`)
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['feedback'] }),
  })
}

// --- Comment hooks ---

export function useComments(feedbackId: string) {
  return useQuery({
    queryKey: ['comments', feedbackId],
    queryFn: async () => {
      const res = await api.get(`/feedback/${feedbackId}/comments`)
      return res.data.data as Comment[]
    },
  })
}

export function useCreateComment(feedbackId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (content: string) => {
      const res = await api.post(`/feedback/${feedbackId}/comments`, { content })
      return res.data.data as Comment
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['comments', feedbackId] }),
  })
}

export function useDeleteComment(feedbackId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (commentId: string) => {
      await api.delete(`/feedback/${feedbackId}/comments/${commentId}`)
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['comments', feedbackId] }),
  })
}