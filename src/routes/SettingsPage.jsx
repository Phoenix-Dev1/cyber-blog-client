import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import Upload from "../components/Upload";
import Image from "../components/Image";

const SettingsPage = () => {
  const { user, updateUser } = useAuth();
  
  const [formData, setFormData] = useState({
    username: user?.username || "",
    bio: user?.bio || "",
    img: user?.img || "",
  });
  
  const [progress, setProgress] = useState(0);

  const mutation = useMutation({
    mutationFn: async (updatedData) => {
      const token = localStorage.getItem("authToken");
      return axios.patch(`${import.meta.env.VITE_API_URL}/users/settings`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      toast.success("Identity updated successfully.");
      updateUser();
    },
    onError: (error) => {
      toast.error(error.response?.data || "Failed to update signal.");
    },
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAvatarUpdate = (res) => {
    setFormData((prev) => ({ ...prev, img: res.filePath }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex flex-col gap-10">
        <div className="flex items-center justify-between border-b border-white/5 pb-6">
          <h1 className="text-4xl font-black text-white tracking-tight uppercase">System Settings</h1>
          <div className="text-[10px] font-black text-cyber-purple uppercase tracking-[0.2em] bg-cyber-purple/10 px-4 py-1.5 rounded-full border border-cyber-purple/20">
            Secure Config Access
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {/* Avatar Upload Section */}
          <div className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center gap-10 shadow-2xl">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyber-cyan to-cyber-purple rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-white/10 shadow-glow-purple-sm">
                <Image 
                  src={formData.img || "default-avatar.png"} 
                  className="w-full h-full object-cover" 
                  alt="Avatar Preview" 
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 items-center md:items-start flex-1">
              <Upload type="image" setProgress={setProgress} setData={handleAvatarUpdate}>
                <button type="button" className="py-3 px-8 bg-white/5 border border-white/10 rounded-xl text-cyber-cyan font-black text-xs uppercase tracking-widest hover:bg-cyber-cyan/10 hover:border-cyber-cyan/30 transition-all shadow-glow-cyan-sm">
                  Initialize Avatar Override
                </button>
              </Upload>
              {progress > 0 && progress < 100 && (
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-cyber-cyan transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
              )}
              <p className="text-cyber-muted text-[10px] uppercase tracking-widest">Recommended: 400x400px .png or .jpg</p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-10 space-y-8 shadow-2xl">
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-cyber-cyan/70 ml-1">Identity Handle</label>
              <input 
                type="text" 
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-4 bg-cyber-bg/50 border border-white/10 rounded-2xl text-white placeholder:text-white/10 focus:outline-none focus:border-cyber-cyan focus:shadow-glow-cyan transition-all"
                placeholder="New username..."
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-cyber-purple/70 ml-1">Biographical Record</label>
              <textarea 
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full p-4 bg-cyber-bg/50 border border-white/10 rounded-2xl text-white placeholder:text-white/10 focus:outline-none focus:border-cyber-purple focus:shadow-glow-purple-sm transition-all resize-none leading-relaxed"
                placeholder="Establish your history in the sphere..."
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button 
              type="submit"
              disabled={mutation.isPending}
              className="px-12 py-5 bg-gradient-to-r from-cyber-cyan to-cyber-purple text-cyber-bg font-black text-sm uppercase tracking-widest rounded-2xl shadow-glow-cyan hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
            >
              {mutation.isPending ? "Syncing..." : "Commit Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
