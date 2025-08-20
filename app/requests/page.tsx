import { getAllRequests } from "@/lib/dataStorage";
import Link from "next/link";
import { formatDateForDisplay } from "@/lib/dateUtils";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default async function RequestsPage() {
  const requests = await getAllRequests();
  console.log("🚀 ~ RequestsPage ~ requests:", requests);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">API Requests</h1>

      {requests.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No requests received yet</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead className="w-[250px]">Timestamp</TableHead>
              <TableHead className="w-[100px]">StudyID</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Endpoint</TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.id}</TableCell>
                <TableCell>{formatDateForDisplay(request.timestamp)}</TableCell>
                <TableCell>{request?.body?.biotricityStudyId}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{request.method}</Badge>
                </TableCell>
                <TableCell>{request.endpoint}</TableCell>
                <TableCell>{request.ip}</TableCell>
                <TableCell className="text-right">
                  <Link
                    href={`/requests/${request.id}`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    View Details
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
