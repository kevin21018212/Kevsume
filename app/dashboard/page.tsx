// app/dashboard/page.tsx (Creation Page with Dynamic Links)
"use client";
import styles from "./dashboard.module.scss";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, storage } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import Profile from "@/components/Profile";
import Links from "@/components/Links";

import ProfilePicture from "@/components/profilePicture";
import ColorScheme from "@/components/colorScheme";

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

    if (profilePicture) {
      const storageRef = ref(storage, `profilePictures/${user?.uid}`);
      await uploadBytes(storageRef, profilePicture);
      uploadedProfilePictureUrl = await getDownloadURL(storageRef);
    }

    if (user?.uid) {
      await setDoc(doc(db, "users", user.uid), {
        name: name || "", // Ensure you handle empty values
        title: title || "",
        description: description || "",
        profilePictureUrl: uploadedProfilePictureUrl || "",
        links: links || [], // Ensure arrays are correctly initialized
        colorScheme: colorScheme || {}, // Ensure objects are correctly initialized
      });

      router.push(`/users/${user.uid}`);
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setColorScheme({ ...colorScheme, [e.target.name]: e.target.value });
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.profileContainer}>
        <div className={styles.profileSection}>
          <Profile
            name={name}
            title={title}
            description={description}
            setName={setName}
            setTitle={setTitle}
            setDescription={setDescription}
          />
        </div>
        <div className={styles.profilePictureSection}>
          <ProfilePicture handleFileChange={handleFileChange} />
        </div>
      </div>
      <Links
        links={links}
        handleLinkChange={handleLinkChange}
        handleAddLink={handleAddLink}
        handleRemoveLink={handleRemoveLink}
      />
      <ColorScheme colorScheme={colorScheme} handleColorChange={handleColorChange} />

      <div className={styles.buttonContianer}>
        <button className={styles.saveButton} onClick={handleSave}>
          Save
        </button>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
