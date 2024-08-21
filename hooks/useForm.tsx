import { useState } from "react";

type FormState = {
  fromLocation: string;
  toLocation: string;
  fromDate: Date;
  toDate: Date;
  budget: string;
  numberOfPassengers: number;
};

const useForm = () => {
  const [formState, setFormState] = useState<FormState>({
    fromLocation: "",
    toLocation: "",
    fromDate: new Date(),
    toDate: new Date(new Date().setDate(new Date().getDate() + 4)),
    budget: "",
    numberOfPassengers: 1,
  });

  const handleInputChange = <K extends keyof FormState>(
    name: K,
    value: FormState[K]
  ) => {
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const incrementPassengers = () => {
    setFormState((prevState) => ({
      ...prevState,
      numberOfPassengers: prevState.numberOfPassengers + 1,
    }));
  };

  const decrementPassengers = () => {
    setFormState((prevState) => ({
      ...prevState,
      numberOfPassengers: Math.max(1, prevState.numberOfPassengers - 1),
    }));
  };

  const resetForm = () => {
    setFormState({
      fromLocation: "",
      toLocation: "",
      fromDate: new Date(),
      toDate: new Date(new Date().setDate(new Date().getDate() + 4)),
      budget: "",
      numberOfPassengers: 1,
    });
  };

  return {
    formState,
    handleInputChange,
    incrementPassengers,
    decrementPassengers,
    resetForm,
  };
};

export default useForm;
