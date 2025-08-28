import { Camera, Mail, User } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
const ProfilePage = () => {
  const [selectImg, setSelectImg] = useState(null);
  const { updateProfile, isUploading, user } = useAuthStore();
  const handleSelectImg = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      setSelectImg(reader.result);
      await updateProfile({ profilePic: reader.result });
    };
  };

  return (
    <div className="min-h-[calc(100vh-64px)] grid grid-cols-1 md:grid-cols-3 bg-base-300">
      <div className="md:border-r border-zinc-400">
        <div className="flex flex-col justify-center h-full gap-4">
          {/* Title */}
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>
          {/* Avatar */}
          <div className="flex items-center justify-center flex-col gap-4">
            <div className="relative">
              <img
                src={user?.profilePic || selectImg || "/avatar.png"}
                className="w-32 h-32 rounded-full object-cover"
              />
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-base-content hover:scale-105
                p-2 rounded-full cursor-pointer 
                transition-all duration-200"
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleSelectImg}
                  disabled={isUploading}
                />
              </label>
            </div>
            <p className="text-sm">
              {isUploading
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>
        </div>
      </div>

      {/* Form Data */}
      <div className="md:border-r border-zinc-400 flex flex-col justify-center items-center gap-4 px-4">
        <div className="space-y-1.5 w-full">
          <div className="text-sm flex items-center gap-2">
            <User className="w-4 h-4" />
            Full Name
          </div>
          <p className="px-4 py-2.5 bg-base-200 rounded-lg">
            {user?.fullName || "John Doe"}
          </p>
        </div>
        <div className="space-y-1.5 w-full">
          <div className="text-sm flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email
          </div>
          <p className="px-4 py-2.5 bg-base-200 rounded-lg">
            {user?.email || "John Doe"}
          </p>
        </div>
      </div>
      {/* Details */}
      <div className="flex flex-col justify-center px-4">
        <h2 className="text-lg font-medium mb-4">Account Information</h2>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between py-2 border-b border-zinc-400">
            <span>Member Since</span>
            <span>{user?.createdAt?.split("T")[0]}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span>Account Status</span>
            <span className="text-green-500">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
