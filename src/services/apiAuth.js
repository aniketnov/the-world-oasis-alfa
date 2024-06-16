import supabase from "./supabase";

export async function getSignUp({ fullName, email, password }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  return { data };
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  return data?.user;
}

export async function logOut() {
  let { error } = await supabase.auth.signOut();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // Update Password or fullName
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  if (!avatar) return data;

  // upload the avatar
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("Avatars")
    .upload(fileName, avatar);

  if (storageError) {
    console.log(storageError);
    throw new Error(storageError.message);
  }
  // update avatar on the user
  const { data: updatedUser, error: newError } = await supabase.auth.updateUser(
    {
      data: {
        avatar: `https://ssymesdzewruhrteglkk.supabase.co/storage/v1/object/public/Avatars/${fileName}`,
      },
    }
  );
  if (newError) {
    console.log(newError);
    throw new Error(newError.message);
  }
  return { updatedUser };
}
