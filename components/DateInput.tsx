import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

const DateInput = ({
  date,
  label,
  setDate,
}: {
  date: Date;
  label: string;
  setDate: (date: Date) => void;
}) => {
  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        style={{
          height: 60,
        }}
        minimumDate={new Date()}
        onChange={onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  label: {
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default DateInput;
