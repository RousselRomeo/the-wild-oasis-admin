import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startswith?.(supabaseUrl);
  console.log("hasImagepath", hasImagePath);
  console.log("newCabin", newCabin);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  console.log("imageName", imageName);
  const imagePath = hasImagePath
    ? newCabin.image.at[0]
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1. create/edit cabin
  let query = supabase.from("cabins");

  //A) Create
  // if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  if (!id)
    query = query.insert(
      !newCabin.image[0] ? { ...newCabin, image: imagePath } : { ...newCabin }
    );

  //B) Edit
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  //2. Upload Image

  if (hasImagePath) return data;

  console.log("hasImagePath", hasImagePath);

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3. Delete the cabin if there was an error uploading image

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
