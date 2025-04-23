import Layout from "@/components/Layout";

export default function ConfirmationPage() {
  return (
    <Layout>
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-green-700 mb-4">Thank you!</h1>
        <p className="text-gray-600">
          Your response has been submitted successfully.
        </p>
      </div>
    </Layout>
  );
}
