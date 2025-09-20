import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import type { VideoFilters } from '../types';

function parseFilters(params: URLSearchParams): VideoFilters {
  const team = params.get('team') ?? undefined;
  const dateFrom = params.get('dateFrom') ?? undefined;
  const dateTo = params.get('dateTo') ?? undefined;

  return {
    team,
    dateFrom,
    dateTo,
  };
}

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const filters = useMemo(() => parseFilters(searchParams), [searchParams]);

  return (
    <div className="space-y-6">
      <section className="rounded-md border bg-white p-4 shadow-sm">
        <header className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Latest highlights</h2>
            <p className="text-sm text-gray-500">
              Configure filters and explore spoiler free recaps.
            </p>
          </div>
          <Link
            to="/videos/sample"
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            Sample video
          </Link>
        </header>
        <dl className="grid gap-2 text-sm text-gray-600 sm:grid-cols-3">
          <div>
            <dt className="font-medium text-gray-700">Team</dt>
            <dd>{filters.team ?? 'All teams'}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-700">Date from</dt>
            <dd>{filters.dateFrom ?? 'Any time'}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-700">Date to</dt>
            <dd>{filters.dateTo ?? 'Any time'}</dd>
          </div>
        </dl>
      </section>

      <section className="rounded-md border border-dashed border-gray-300 bg-gray-50 p-6 text-center text-sm text-gray-500">
        VideoGrid placeholder. Highlights will render here once data wiring is ready.
      </section>
    </div>
  );
}
