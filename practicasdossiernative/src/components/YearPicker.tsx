import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const YearPicker = ({ selectedYear, onYearChange }) => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(selectedYear || currentYear);

  const years = [];
  for (let i = currentYear; i >= 1900; i--) {
    years.push(i);
  }

  const handleYearChange = (selectedYear) => {
    setYear(selectedYear);
    onYearChange(selectedYear);
  };

  return (
    <Picker
      selectedValue={year}
      onValueChange={handleYearChange}
      style={styles.picker}
    >
      {years.map((year) => (
        <Picker.Item key={year} label={year.toString()} value={year} />
      ))}
    </Picker>
  );
};

const styles = StyleSheet.create({
  picker: {
    width: 150,
    height: 50,
  },
});

export default YearPicker;
