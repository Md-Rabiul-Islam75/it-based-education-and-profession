import React, { useEffect, useState } from "react";
import { Briefcase, MapPin, Clock } from "lucide-react";
import { getJobPosts } from "../../service/jobPostService";

const JobSite = () => {
  const [websites, setWebsites] = useState([]);
  const [expandedSites, setExpandedSites] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await getJobPosts();

      // Flatten the deeply nested Interview array
      const flattenedWebsites =
        data?.responseData?.Interview?.[0]?.length > 0
          ? data.responseData.Interview[0]
          : [];

      setWebsites(flattenedWebsites);
    };

    fetchData();
  }, []);

  const toggleShowMore = (siteName) => {
    setExpandedSites((prev) => ({
      ...prev,
      [siteName]: !prev[siteName],
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h4 className="text-4xl font-bold text-center mb-10 text-gray-800">
        🔍 Latest Job Opportunities
      </h4>

      {websites.map((site, index) => {
        const isExpanded = expandedSites[site.websiteName] || false;
        const displayedJobs = isExpanded
          ? site.jobPosts
          : site.jobPosts.slice(0, 3);

        return (
          <div key={index} className="mb-12">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              🌐 {site.websiteName}
            </h2>

            {displayedJobs.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {displayedJobs.map((job, idx) => (
                    <div
                      key={idx}
                      className="bg-white shadow-xl hover:shadow-2xl border border-gray-100 rounded-2xl p-6 transition duration-300 ease-in-out"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                          <Briefcase className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {job.title}
                          </h3>
                          <p className="text-sm text-gray-500">{job.company}</p>
                        </div>
                      </div>

                      <div className="text-sm text-gray-600 space-y-1 mb-4">
                        <p className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          {job.location}
                        </p>
                        <p className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          {job.postedTime}
                        </p>
                      </div>

                      <p className="text-gray-700 text-sm mb-5 line-clamp-3">
                        {job.description}
                      </p>

                      <a
                        href={job.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-center bg-blue-600 text-white font-medium px-4 py-2 rounded-xl hover:bg-blue-700 transition"
                      >
                        View Job
                      </a>
                    </div>
                  ))}
                </div>

                {site.jobPosts.length > 3 && (
                  <div className="text-center mt-4">
                    <button
                      onClick={() => toggleShowMore(site.websiteName)}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {isExpanded ? "Show Less ▲" : "Show More ▼"}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="text-gray-500 italic">No job posts available.</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default JobSite;
