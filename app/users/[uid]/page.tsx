// app/users/[uid]/page.tsx (Public Profile Page with Dynamic Links)
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function UserProfile({ params }: { params: { uid: string } }) {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const docRef = doc(db, "users", params.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    };

    fetchUserData();
  }, [params.uid]);

  if (!userData) return <div>Loading...</div>;

  return (
    <div
      style={{
        backgroundColor: userData.colorScheme.containerColor,
        color: userData.colorScheme.textColor,
      }}
    >
      <h1>{userData.name}</h1>
      <h2>{userData.title}</h2>
      {userData.profilePictureUrl && <img src={userData.profilePictureUrl} alt="Profile" />}
      <p>{userData.description}</p>

      <h3>Links</h3>
      <ul>
        {userData.links.map((link: { name: string; href: string }, index: number) => (
          <li key={index}>
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
