import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import useSettings from "./useSettings";
import useUpdateSettings from "./useupdateSettings";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      maxGuestsPerBooking,
      breakfastPrice,
      maxBookingLength,
      minBookingLength,
    } = {},
  } = useSettings();
  const { isUpdating, updateMutate } = useUpdateSettings();
  if (isLoading) return <Spinner />;

  function handleupdate(e, field) {
    const { value } = e.target;
    // console.log(value);
    if (!value) return;
    updateMutate({ [field]: value });
  }

  return (
    <Form>
      <FormRow lable="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isUpdating}
          defaultValue={minBookingLength}
          onBlur={(e) => handleupdate(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow lable="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isUpdating}
          defaultValue={maxBookingLength}
          onBlur={(e) => handleupdate(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow lable="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isUpdating}
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleupdate(e, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow lable="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isUpdating}
          defaultValue={breakfastPrice}
          onBlur={(e) => handleupdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
