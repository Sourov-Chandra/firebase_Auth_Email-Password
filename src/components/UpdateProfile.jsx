import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "firebase/auth"; // ✅ import this

const UpdateProfile = () => {
  const { currentUser } = useAuth();
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      await updateProfile(currentUser, {
        displayName: name || currentUser.displayName,
        photoURL: photoURL || currentUser.photoURL,
      });

      setSuccessMessage("✅ Profile updated successfully!");
      setErrorMessage("");
    } catch (error) {
      console.error("Update failed:", error);
      setErrorMessage("❌ Failed to update profile");
      setSuccessMessage("");
    }
  };

  return (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-bold">Update your Profile</h2>
      <p>Current Display Name: {currentUser?.displayName || "Not set yet!"}</p>
      <p>Current Profile Photo:</p>
      {currentUser?.photoURL && (
        <img
          src={currentUser.photoURL}
          alt="Profile"
          className="w-24 h-24 rounded-full"
        />
      )}

      <form
        onSubmit={handleUpdateProfile}
        className="max-w-sm space-y-3 shadow-2xl rounded-2xl p-3"
      >
        <div className="space-y-2">
          <label className="block">New Display Name:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Set new Name"
            className="border p-2 w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="block">New Profile Photo URL:</label>
          <input
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            type="url"
            placeholder="Set new Photo URL"
            className="border p-2 w-full"
          />
        </div>

        <button className="border bg-blue-500 hover:bg-blue-600 text-white rounded p-2 cursor-pointer">
          Update Profile
        </button>

        {successMessage && (
          <p className="text-green-500 text-sm italic">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-500 text-sm italic">{errorMessage}</p>
        )}
      </form>
    </div>
  );
};

export default UpdateProfile;
