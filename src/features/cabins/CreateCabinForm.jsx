import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { createEditCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({ cabinToEdit = {} }) {
  console.log("cabinToEdit", cabinToEdit);
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({ defaultValues: isEditSession ? editValues : {} });
  const { errors } = formState;

  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: (newCabin) => createEditCabin(newCabin),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin successfully created");
      reset();
    },
    onError: (err) => toast.error(err.message)
  });

  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: (newCabin, id) => createEditCabin(newCabin, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin successfully eidted");
      reset();
    },
    onError: (err) => toast.error(err.message)
  });

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    console.log("AAA", data);
    // mutate(data);
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession) editCabin({ newCabinData: { ...data, image }, id: editId });
    else createCabin({ ...data, image: image });
  }

  function onError(errors) {
    // console.log("aa", errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors.name?.message}>
        <Input type="text" id="name" disabled={isWorking} {...register("name", { required: "This field is required" })} />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" disabled={isWorking} {...register("maxCapacity", { required: "This field is required", min: { value: 1, message: "Capacity should be at least 1" } })} />
      </FormRow>

      <FormRow label="Regular price" error={errors.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", { required: "This field is required", min: { value: 1, message: "Capacity should be at least 1" } })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", { required: "This field is required", validate: (value) => value < getValues().regularPrice || "Discount should be less than regularPrice" })}
        />
      </FormRow>

      <FormRow label="Description for website" error={errors.description?.message}>
        <Textarea type="number" id="description" disabled={isWorking} defaultValue="" {...register("description", { required: "This field is required" })} />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required"
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>{isEditSession ? "Edit cabin" : "Create new cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
