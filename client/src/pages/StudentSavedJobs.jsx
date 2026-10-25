import React from 'react';
import { Link } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import JobCard from '../components/common/JobCard';
import { Bookmark, Inbox } from 'lucide-react';

export default function StudentSavedJobs() {
  const { jobs, savedJobIds } = useJobs();

  const savedJobs = jobs.filter((j) => savedJobIds.includes(j.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="pb-6 border-b border-[#DCE5ED]">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600">
          <Bookmark className="w-4 h-4 text-amber-500" />
          <span>Saved Opportunities</span>
        </div>
        <h1 className="text-2xl font-extrabold text-[#173B63] mt-1">
          Bookmarked CA Vacancies
        </h1>
        <p className="text-sm text-slate-600">
          Review and submit applications to the firms and roles you've shortlisted.
        </p>
      </div>

      {savedJobs.length === 0 ? (
        <div className="bg-white border border-[#DCE5ED] rounded-2xl p-12 text-center space-y-4">
          <Bookmark className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-[#173B63]">No saved jobs yet</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Click the bookmark icon on any job card across Articleship, Industrial Training or CA Jobs to save it here.
          </p>
          <Link
            to="/articleship"
            className="inline-block px-5 py-2.5 bg-[#173B63] text-white text-xs font-bold rounded-xl"
          >
            Explore Articleship
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
