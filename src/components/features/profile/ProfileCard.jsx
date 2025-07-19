export function ProfileCard({
    name = "Sophia Bennett",
    title = "Software Engineer",
    joinedYear = "2025",
    avatarUrl = "https://api.builder.io/api/v1/image/assets/TEMP/5ef27a5a2f7ba565fe57ebd1322818524f7c9d39?width=256",
    applicationHistory = [
      {
        jobTitle: "Senior Software Engineer",
        company: "Tech Innovations Inc.",
        status: "Interviewing",
        dateApplied: "2023-08-15",
      },
      {
        jobTitle: "Software Engineer",
        company: "Global Solutions Ltd.",
        status: "Rejected",
        dateApplied: "2023-07-20",
      },
      {
        jobTitle: "Junior Developer",
        company: "Creative Apps Co.",
        status: "Accepted",
        dateApplied: "2023-06-05",
      },
    ],
  }) {
    const getStatusBadgeColor = (status) => {
      switch (status) {
        case "Interviewing":
          return "bg-dashboard-accent text-dashboard-text";
        case "Rejected":
          return "bg-dashboard-accent text-dashboard-text";
        case "Accepted":
          return "bg-dashboard-accent text-dashboard-text";
        default:
          return "bg-dashboard-accent text-dashboard-text";
      }
    };
  
    return (
      <div className="flex max-w-[960px] flex-col items-start flex-1">
        {/* Header */}
        <div className="flex p-4 justify-between items-start content-start gap-3 self-stretch flex-wrap">
          <div className="flex min-w-72 flex-col items-start gap-3">
            <div className="flex w-[301px] flex-col items-start">
              <h1 className="self-stretch text-dashboard-text font-inter text-[32px] font-bold leading-10">
                Profile
              </h1>
            </div>
            <div className="flex flex-col items-start">
              <span className="self-stretch text-dashboard-muted font-inter text-sm font-normal leading-5">
                Manage your profile information and settings.
              </span>
            </div>
          </div>
        </div>
  
        {/* Profile Info */}
        <div className="flex p-4 items-start self-stretch">
          <div className="flex justify-between items-center flex-1">
            <div className="flex items-start gap-4">
              <img
                className="w-32 h-32 min-h-32 rounded-full"
                src={avatarUrl}
                alt={`${name} profile`}
              />
              <div className="flex h-32 flex-col justify-center items-start">
                <div className="flex flex-col items-start">
                  <span className="self-stretch text-dashboard-text font-inter text-[22px] font-bold leading-7">
                    {name}
                  </span>
                </div>
                <div className="flex w-40 flex-col items-start">
                  <span className="self-stretch text-dashboard-muted font-inter text-base font-normal leading-6">
                    {title}
                  </span>
                </div>
                <div className="flex w-40 flex-col items-start">
                  <span className="self-stretch text-dashboard-muted font-inter text-base font-normal leading-6">
                    Joined in {joinedYear}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Application History */}
        <div className="flex py-5 px-4 pb-3 flex-col items-start self-stretch">
          <h2 className="self-stretch text-dashboard-text font-inter text-[22px] font-bold leading-7">
            Application History
          </h2>
        </div>
  
        <div className="flex p-3 px-4 flex-col items-start self-stretch">
          <div className="flex items-start self-stretch rounded-xl border border-dashboard-border bg-dashboard-bg">
            <div className="flex flex-col items-start flex-1">
              {/* Table Header */}
              <div className="flex flex-col items-start self-stretch">
                <div className="flex items-start flex-1 self-stretch bg-dashboard-bg">
                  <div className="flex w-[230px] p-3 px-4 flex-col items-start self-stretch">
                    <span className="self-stretch text-dashboard-text font-inter text-sm font-medium leading-5">
                      Job Title
                    </span>
                  </div>
                  <div className="flex w-[235px] p-3 px-4 flex-col items-start self-stretch">
                    <span className="self-stretch text-dashboard-text font-inter text-sm font-medium leading-5">
                      Company
                    </span>
                  </div>
                  <div className="flex w-[187px] p-3 px-4 flex-col items-start self-stretch">
                    <span className="self-stretch text-dashboard-text font-inter text-sm font-medium leading-5">
                      Status
                    </span>
                  </div>
                  <div className="flex w-[221px] p-3 px-4 flex-col items-start self-stretch">
                    <span className="self-stretch text-dashboard-text font-inter text-sm font-medium leading-5">
                      Date Applied
                    </span>
                  </div>
                </div>
              </div>
  
              {/* Table Rows */}
              <div className="flex flex-col items-start self-stretch">
                {applicationHistory.map((item, index) => (
                  <div
                    key={index}
                    className="flex h-18 items-start self-stretch border-t border-gray-200"
                  >
                    <div className="flex w-[230px] h-18 p-2 px-4 flex-col justify-center items-center">
                      <span className="self-stretch text-dashboard-text font-inter text-sm font-normal leading-5">
                        {item.jobTitle}
                      </span>
                    </div>
                    <div className="flex w-[235px] h-18 p-2 px-4 flex-col justify-center items-center">
                      <span className="self-stretch text-dashboard-muted font-inter text-sm font-normal leading-5">
                        {item.company}
                      </span>
                    </div>
                    <div className="flex w-[187px] h-18 p-2 px-4 flex-col justify-center items-center">
                      <div
                        className={`flex h-8 min-w-21 max-w-120 px-4 justify-center items-center flex-shrink-0 self-stretch rounded-2xl ${getStatusBadgeColor(item.status)}`}
                      >
                        <div className="flex flex-col items-center">
                          <span className="self-stretch overflow-hidden text-center font-inter text-sm font-medium leading-5 text-ellipsis line-clamp-1">
                            {item.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-[221px] h-18 p-2 px-4 flex-col justify-center items-center">
                      <span className="self-stretch text-dashboard-muted font-inter text-sm font-normal leading-5">
                        {item.dateApplied}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  