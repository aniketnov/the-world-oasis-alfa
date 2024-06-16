import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function getCabin() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("cabins could not be loaded");
  }
  return data;
}

export async function createCabin(newCabin, id) {
  console.log(newCabin, id);
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;

  // 1. Create or update the cabin record
  let { data, error } = {};

  if (!id) {
    // Create a new cabin
    ({ data, error } = await supabase
      .from("cabins")
      .insert([{ ...newCabin, image: imagePath }])
      .select()
      .single());
  } else {
    // Update an existing cabin
    ({ data, error } = await supabase
      .from("cabins")
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .single());
  }

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be created/updated");
  }

  // 2. Upload the image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabins")
    .upload(imageName, newCabin.image);

  if (storageError) {
    // If there was an error uploading the image, delete the cabin record
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error(
      "Cabin image could not be uploaded, and the cabin was not created/updated"
    );
  }

  return data;
}

export async function updateCabin(id) {
  const { data, error } = await supabase
    .from("cabins")
    .update({ other_column: "otherValue" })
    .eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("cabins could not Updated");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("cabins could not deleted");
  }
  return data;
}
