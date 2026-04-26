'use client'

import { useState } from 'react'
import { useFeedback, FeedbackStatus } from '@/hooks/use-feedback'
import { FeedbackCard } from '@/components/feedback/feedback-card'
import { SubmitFeedbackModal } from '@/components/feedback/submit-feedback-modal'
import { Button } from '@/components/ui/button'

const FILTERS: { label: string; value: FeedbackStatus | 'ALL' }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Open', value: 'OPEN' },
  { label: 'Planned', value: 'PLANNED' },
  { label: 'In Progress', value: 'INPROGRESS' },
  { label: 'Completed', value: 'COMPLETED' },
]

export default function FeedbackPage() {
  const { data: feedbacks, isLoading, isError } = useFeedback()
  const [filter, setFilter] = useState<FeedbackStatus | 'ALL'>('ALL')
  const [showModal, setShowModal] = useState(false)

  const filtered = filter === 'ALL'
    ? feedbacks
    : feedbacks?.filter(f => f.status === filter)

  return (
    <>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Feature Requests</h1>
          <p className="text-sm text-gray-500 mt-0.5">Vote on what matters most to you</p>
        </div>
        <Button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 shrink-0"
          size="sm"
        >
          + Submit
        </Button>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`
              px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border
              ${filter === f.value
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-gray-500 border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
              }
            `}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Loading skeleton */}
      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 flex gap-3 animate-pulse">
              <div className="w-9 h-12 bg-gray-100 rounded-lg shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-100 rounded w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-full" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="text-center py-12">
          <p className="text-sm text-red-500">Failed to load feedback. Please refresh.</p>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !isError && filtered?.length === 0 && (
        <div className="text-center py-16">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center mx-auto mb-4">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="#4F46E5" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-gray-900 mb-1">No feedback yet</h3>
          <p className="text-xs text-gray-500 mb-4">Be the first to share an idea with the team</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowModal(true)}
            className="border-indigo-300 text-indigo-600 hover:bg-indigo-50"
          >
            Submit feedback
          </Button>
        </div>
      )}

      {/* Feedback list */}
      {!isLoading && !isError && filtered && filtered.length > 0 && (
        <div className="space-y-3">
          {filtered.map(item => (
            <FeedbackCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && <SubmitFeedbackModal onClose={() => setShowModal(false)} />}
    </>
  )
}