export function SettingsPanel({
    onEmailEdit = () => console.log("Edit email"),
    onPasswordEdit = () => console.log("Edit password"),
    onNotificationsEdit = () => console.log("Edit notifications"),
    onLogout = () => console.log("Logout"),
  }) {
    const settingsItems = [
      {
        title: "Email",
        description: "Update your email address",
        onEdit: onEmailEdit,
      },
      {
        title: "Password",
        description: "Change your password",
        onEdit: onPasswordEdit,
      },
      {
        title: "Notifications",
        description: "Manage your notification preferences",
        onEdit: onNotificationsEdit,
      },
    ];
  
    return (
      <div className="flex flex-col items-start self-stretch">
        {/* Settings Header */}
        <div className="flex py-5 px-4 pb-3 flex-col items-start self-stretch">
          <h2 className="self-stretch text-dashboard-text font-inter text-[22px] font-bold leading-7">
            Settings
          </h2>
        </div>
  
        {/* Settings Items */}
        {settingsItems.map((item, index) => (
          <div
            key={index}
            className="flex h-18 min-h-18 p-2 px-4 justify-between items-center self-stretch bg-dashboard-bg"
          >
            <div className="flex flex-col justify-center items-start">
              <div className="flex flex-col items-start">
                <span className="self-stretch text-dashboard-text font-inter text-base font-medium leading-6">
                  {item.title}
                </span>
              </div>
              <div className="flex flex-col items-start">
                <span className="self-stretch text-dashboard-muted font-inter text-sm font-normal leading-5">
                  {item.description}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-start">
              <div className="flex flex-col items-center flex-1">
                <button
                  onClick={item.onEdit}
                  className="self-stretch text-black text-center font-inter text-base font-medium leading-6 hover:underline focus:outline-none focus:underline"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
  
        {/* Log Out Button */}
        <div className="flex p-3 px-4 items-start self-stretch">
          <div className="flex h-10 min-w-21 max-w-120 px-4 justify-center items-center rounded-2xl bg-dashboard-accent">
            <div className="flex flex-col items-center">
              <button
                onClick={onLogout}
                className="self-stretch overflow-hidden text-center text-dashboard-text font-inter text-sm font-bold leading-5 text-ellipsis line-clamp-1 hover:opacity-80 focus:outline-none focus:opacity-80"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  