import message from '../content/flash.json'

const Flash = () => (
  <>
    {message.subject && (
      <div className="max-w-6xl mx-auto mt-4">
        <div
          className="bg-pink-100 fg-black text-red-800 sm:rounded px-4 py-3 shadow-md"
          role="alert"
        >
          <div className="flex space-x-4">
            <svg
              className="w-6 h-6 mt-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="flex-1">
              <p className="font-bold">{message.subject}</p>
              <p className="text-sm">{message.body}</p>
            </div>
          </div>
        </div>
      </div>
    )}
  </>
)

export default Flash
