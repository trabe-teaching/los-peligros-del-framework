import * as React from "react";
import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query';
import Layout from "./layout.jsx";
import Form from "./form.jsx";
import Feedback from "./feedback.jsx";

const submitForm = async (formData) => {
  const res = await fetch("http://localhost:3001/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    throw new Error(`Something went wrong. Status: ${res.statusCode}`);
  }

  return res.json();
}

const App = () => {
  const [ feedback, setFeedback ] = React.useState("");
  const formRef = React.useRef();

  React.useEffect(() => {
    formRef.current?.focus();
  }, []);

  const mutation = useMutation({
    mutationFn: submitForm,
    onSuccess: (data) => {
      setFeedback(`Registered as ${data.email}`);
      formRef.current.clear();
    },
    onError: (error) => {
      console.error(error);
      setFeedback("Something went wrong 😅");
    },
  });

  const handleSubmit = (data) => {
    setFeedback("");
    mutation.mutate(data);
  };

  return (
    <Layout>
      <Form ref={formRef} submitting={mutation.isPending} onSubmit={handleSubmit} />
      <Feedback text={feedback} />
    </Layout>
  );
}


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    }
  },
});

export default () => (
  <QueryClientProvider client={queryClient}>
    <App/>
  </QueryClientProvider>
);
