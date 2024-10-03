// app/dashboard/page.tsx (Creation Page with Dynamic Links)
"use client";

import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, storage } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import Profile from "@/components/Profile";

export default function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(null);
  const [links, setLinks] = useState<{ name: string; href: string }[]>([]);
  const [colorScheme, setColorScheme] = useState({
    mainColor1: "#ffffff",
    mainColor2: "#ffffff",
    textColor: "black",
    containerColor: "#ffffff",
  });
  const router = useRouter();
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!user && !loading) {
      router.push("/");
    } else if (user) {
      const loadUserData = async () => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name);
          setTitle(data.title);
          setDescription(data.description);
          setProfilePictureUrl(data.profilePictureUrl);
          setLinks(data.links || []);
          setColorScheme(data.colorScheme);
        }
      };
      loadUserData();
    }
  }, [user, loading, router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const handleAddLink = () => {
    setLinks([...links, { name: "", href: "" }]); // Add empty link object
  };

  const handleLinkChange = (index: number, field: "name" | "href", value: string) => {
    const newLinks = [...links];
    newLinks[index][field] = value;
    setLinks(newLinks);
  };

  const handleRemoveLink = (index: number) => {
    const newLinks = links.filter((_, i) => i !== index);
    setLinks(newLinks);
  };

  const handleSave = async () => {
    let uploadedProfilePictureUrl = profilePictureUrl;

    // Upload the profile picture if a new one is selected
    if (profilePicture) {
      const storageRef = ref(storage, `profilePictures/${user?.uid}`);
      await uploadBytes(storageRef, profilePicture);
      uploadedProfilePictureUrl = await getDownloadURL(storageRef);
    }

    // Save user data to Firestore
    if (user?.uid) {
      await setDoc(doc(db, "users", user.uid), {
        name,
        title,
        description,
        profilePictureUrl: uploadedProfilePictureUrl,
        links,
      });

      router.push(`/users/${user.uid}`);
    }
    router.push(`/users/${user?.uid}`);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColorScheme({ ...colorScheme, [e.target.name]: e.target.value });
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  return (
    <div>
      <Profile
        name={name}
        title={title}
        description={description}
        setName={setName}
        setTitle={setTitle}
        setDescription={setDescription}
      />
      <ProfilePictureSection handleFileChange={handleFileChange} />
      <LinksSection
        links={links}
        handleLinkChange={handleLinkChange}
        handleAddLink={handleAddLink}
        handleRemoveLink={handleRemoveLink}
      />
      <ColorSchemeSection colorScheme={colorScheme} handleColorChange={handleColorChange} />
      <button onClick={handleSave}>Save</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
