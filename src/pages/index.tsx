import Head from 'next/head';
import AddField from 'src/components/AddField';
import FieldList from 'src/components/FieldList';

export default function Home() {
  return (
    <>
      <Head>
        <title>Admin UI</title>
      </Head>
      <main className="max-w-xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-4">Drag-and-Drop Admin UI</h1>
        <AddField />
        <FieldList />
      </main>
    </>
  );
}
