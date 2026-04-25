import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PostList from "../components/PostList";
import Image from "../components/Image";
import LoadingPage from "../components/LoadingPage";

const fetchUser = async (username) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/${username}`);
  return res.data;
};

const ProfilePage = () => {
  const { username: paramUsername, slug } = useParams();
  const username = paramUsername || slug?.replace("@", "");

  const { data: user, isPending, error } = useQuery({
    queryKey: ["user", username],
    queryFn: () => fetchUser(username),
  });

  if (isPending) return <LoadingPage />;
  
  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-4">
      <div className="text-red-500 font-black text-4xl uppercase tracking-tighter">Identity Not Found</div>
      <p className="text-cyber-muted">The requested data node could not be located in the sphere.</p>
    </div>
  );

  return (
    <div className="flex flex-col gap-12 pb-20">
      {/* Profile Header */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyber-cyan to-cyber-purple rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative flex flex-col md:flex-row items-center gap-8 p-10 bg-cyber-card/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] shadow-2xl">
          <div className="w-32 h-32 md:w-44 md:h-44 rounded-full ring-4 ring-cyber-purple/30 ring-offset-4 ring-offset-cyber-bg overflow-hidden shadow-glow-purple">
            <Image 
              src={user.img || "default-avatar.png"} 
              alt={user.username} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="space-y-1">
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase">
                {user.username}
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-[10px] font-black text-cyber-cyan uppercase tracking-[0.2em] bg-cyber-cyan/10 px-3 py-1 rounded-full border border-cyber-cyan/20">
                  Verified Identity
                </span>
              </div>
            </div>
            
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl italic">
              {user.bio || "This user has not established a biographical record yet."}
            </p>
          </div>
        </div>
      </div>

      {/* User Posts */}
      <div className="space-y-10">
        <div className="flex items-center gap-6">
          <h2 className="text-2xl font-black text-white tracking-widest uppercase">Digital Archive</h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </div>
        
        <PostList author={user.username} />
      </div>
    </div>
  );
};

export default ProfilePage;
