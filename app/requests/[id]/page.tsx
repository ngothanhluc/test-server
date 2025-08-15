import { getRequestById } from "@/lib/dataStorage";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDateForDisplay } from "@/lib/dateUtils";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Report {
  contentBase64: string;
}

interface RequestBody {
  report?: Report;
  [key: string]: unknown;
}

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function RequestDetailPage({ params }: Props) {
  const { id } = await params;
  const request = await getRequestById(id);

  if (!request) {
    notFound();
  }

  // Type assertion for the request body
  const requestBody = request.body as RequestBody | null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Request Details</h1>
          <Link
            href="/requests"
            className="text-indigo-600 hover:text-indigo-900"
          >
            ← Back to Requests
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Request Information</CardTitle>
            <CardDescription>
              Detailed information about the API request
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">ID</h3>
                <p className="mt-1 text-sm text-gray-900">{request.id}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Timestamp</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {formatDateForDisplay(request.timestamp)}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Method</h3>
                <p className="mt-1 text-sm text-gray-900">
                  <Badge variant="secondary">{request.method}</Badge>
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Endpoint</h3>
                <p className="mt-1 text-sm text-gray-900">{request.endpoint}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  IP Address
                </h3>
                <p className="mt-1 text-sm text-gray-900">{request.ip}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  User Agent
                </h3>
                <p className="mt-1 text-sm text-gray-900">
                  {request.userAgent}
                </p>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-500">Headers</h3>
              <pre className="bg-gray-100 p-3 rounded overflow-auto text-xs mt-1">
                {JSON.stringify(request.headers, null, 2)}
              </pre>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500">
                Request Body
              </h3>
              <pre className="bg-gray-100 p-3 rounded overflow-auto text-xs mt-1">
                {JSON.stringify(request.body, null, 2)}
              </pre>
            </div>
            {requestBody &&
              requestBody.report &&
              requestBody.report.contentBase64 && (
                <div className="mt-4 h-[80vh]">
                  <h3 className="text-sm font-medium text-gray-500">
                    Report PDF
                  </h3>
                  <div className="mt-1 h-full">
                    <iframe
                      src={`data:application/pdf;base64,${requestBody.report.contentBase64}`}
                      className="w-full h-full border rounded"
                      title="Report PDF"
                    />
                  </div>
                </div>
              )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
