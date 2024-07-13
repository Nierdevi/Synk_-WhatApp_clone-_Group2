import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Pressable, Alert} from "react-native";

const StorageScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>Storage</Text>
      </View>

      <View style={{padding:16,}}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressSection,
              { backgroundColor: "green", flex: 1 },
            ]}
          />
          <View
            style={[
              styles.progressSection,
              { backgroundColor: "orange", flex: 1 },
            ]}
          />
          <View
            style={[
              styles.progressSection,
              { backgroundColor: "purple", flex: 1 },
            ]}
          />
          <View
            style={[styles.progressSection, { backgroundColor: "gray", flex: 1 }]}
          />
        </View>

        <View style={styles.storageInfo}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
            <Ionicons name="stop-circle" size={24} color="green" />
            <Text style={styles.infoText}>Other apps</Text>
          </View>
          <Text style={styles.infoText}>0.00KB</Text>
        </View>
        <View style={styles.storageInfo}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
            <Ionicons name="stop-circle" size={24} color="gold" />
            <Text style={styles.infoText}>Downloads</Text>
          </View>
          <Text style={styles.infoText}>0.00KB</Text>
        </View>
        <View style={styles.storageInfo}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
            <Ionicons name="stop-circle" size={24} color="purple" />
            <Text style={styles.infoText}>Cache</Text>
          </View>
          <Text style={styles.infoText}>0.00KB</Text>
        </View>
        <View style={styles.storageInfo}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
            <Ionicons name="stop-circle" size={24} color="grey" />
            <Text style={styles.infoText}>Free</Text>
          </View>
          <Text style={styles.infoText}>0.00KB</Text>
        </View>

        <Text style={[styles.note, { marginTop: 50 }]}>
          This will remove all downloaded tracks from being available for online
          listening
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert("Doesn't work yet")}
        >
          <Text style={styles.buttonText}>Remove all downloads</Text>
        </TouchableOpacity>

        <Text style={[styles.note, { marginTop: 50 }]}>
          Free up storage by clearing your cache. Your downloads won't be removed
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert("Doesn't work yet")}
        >
          <Text style={styles.buttonText}>Clear cache</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
    marginTop: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'Lightgray',
    backgroundColor: 'white',
    paddingTop: 10,
    paddingLeft: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 10,
    paddingRight: 150,
  },
  storageInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    marginHorizontal: 10,
    borderBottomColor: "#ccc",
  },
  infoText: {
    fontSize: 16,
  },
  progressBar: {
    flexDirection: "row",
    height: 10,
    width: "95%",
    marginHorizontal: "auto",
    backgroundColor: "#eee",
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: "green",
  },
  progressSection: {
    height: "100%",
  },
  button: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 20,
    alignItems: "center",
    width: "70%",
    marginHorizontal: "auto",
    borderRadius: 5,
    borderColor: "red",
  },
  buttonText: {
    fontSize: 16,
    color: "#000",
  },
  note: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    marginTop: 10,
    width: "70%",
    marginHorizontal: "auto",
  },
});

export default StorageScreen;
