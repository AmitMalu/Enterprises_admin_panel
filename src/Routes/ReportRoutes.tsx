import { Route } from "react-router-dom";
import {
  AccountSummaryReport,
  APIPerformanceReport,
  CreateOrderReport,
  CumulativeReport,
  DownloadReport,
  DownloadReportWallet,
  EmailReport,
  GstTdsReport,
  InvoiceReport,
  LedgerReport,
  LiveTransactionReport,
  PendingTransactionReport,
  ReconciliationReport,
  RefundReport,
  SearchTransactionReport,
  SettlementReport,
  SmsReport,
  TransactionReport,
  UnSettledTransactionReport,
  UpdateTransactionReport,
} from "../Pages/Reports";

export const ReportRoutes = (
  <>
    <Route
      path="/report/live-transaction"
      element={<LiveTransactionReport />}
    />
    <Route path="/report/transaction" element={<TransactionReport />} />
    <Route path="/report/settlement" element={<SettlementReport />} />
    <Route
      path="/report/unsettled-transaction"
      element={<UnSettledTransactionReport />}
    />
    <Route
      path="/report/pending-transaction"
      element={<PendingTransactionReport />}
    />
    <Route path="/report/ledger-transaction" element={<LedgerReport />} />
    <Route
      path="/report/update-transaction"
      element={<UpdateTransactionReport />}
    />
    <Route
      path="/report/search-transaction"
      element={<SearchTransactionReport />}
    />
    <Route path="/report/api-performance" element={<APIPerformanceReport />} />
    <Route path="/report/account-summary" element={<AccountSummaryReport />} />
    <Route path="/report/create-order" element={<CreateOrderReport />} />
    <Route path="/report/cumulative" element={<CumulativeReport />} />
    <Route path="/report/download" element={<DownloadReport />} />

    <Route path="/report/email" element={<EmailReport />} />
    <Route path="/report/gst-tds" element={<GstTdsReport />} />
    <Route path="/report/refund" element={<RefundReport />} />
    <Route path="/report/reconciliation" element={<ReconciliationReport />} />
    <Route path="/report/sms" element={<SmsReport />} />

    <Route path="/report/invoice" element={<InvoiceReport />} />
    <Route path="/report/download-report" element={<DownloadReportWallet />} />
  </>
);
