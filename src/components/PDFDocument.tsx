import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { FormData } from '../types/formData';

const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: 'Helvetica', flexDirection: 'column' },
  section: { marginBottom: 10 },
  title: { fontSize: 18, marginBottom: 10 },
  label: { fontWeight: 'bold' },
});

export default function PDFDocument(data: FormData) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>User Details</Text>

        <View style={styles.section}>
          <Text><Text style={styles.label}>Name: </Text>{data.name}</Text>
          <Text><Text style={styles.label}>Email: </Text>{data.email}</Text>
          <Text><Text style={styles.label}>Phone: </Text>{data.phone}</Text>
          <Text><Text style={styles.label}>Position: </Text>{data.position}</Text>
          <Text><Text style={styles.label}>Description: </Text>{data.description}</Text>
        </View>
      </Page>
    </Document>
  );
}
