// src/buoi2/User.js
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import ContactThumbnail from "../components/ContactThumbnail";
import { fetchUserContact } from "../utils/api";
import colors from "../utils/colors";

const User = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchUserContact()
      .then((user) => {
        setUser(user);
        setLoading(false);
        setError(false);
      })
      .catch((e) => {
        setLoading(false);
        setError(true);
      });
  }, []);

  const { avatar, name, phone } = user;

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="white" />}
      {error && <Text style={styles.errorText}>Error loading user...</Text>}
      {!loading && !error && (
        <ContactThumbnail avatar={avatar} name={name} phone={phone} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blue,
  },
  errorText: {
    color: "white",
    fontSize: 18,
  },
});

export default User;
