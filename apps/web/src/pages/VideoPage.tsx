import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function VideoPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={handleBack}
        className="text-sm font-medium text-blue-600 hover:text-blue-500"
      >
        Back to list
      </button>

      <section className="rounded-md border bg-white p-6 shadow-sm">
        <header className="mb-4">
          <p className="text-xs uppercase tracking-wide text-gray-500">
            Video identifier
          </p>
          <h1 className="text-2xl font-semibold text-gray-900">{id}</h1>
        </header>
        <p className="text-sm text-gray-600">
          A detailed player surface will appear here after the data layer and
          media components are wired.
        </p>
      </section>
    </div>
  );
}
