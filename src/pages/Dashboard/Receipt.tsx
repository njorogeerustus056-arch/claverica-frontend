// Receipt.tsx
import React, { useState, useEffect, useCallback, useRef } from "react";
import api from "../../api";
import styles from "./Receipt.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

type ReceiptType = "invoice" | "refund" | "credit_note";

interface Receipt {
  id: number;
  type: ReceiptType;
  type_display: string;
  amount: string;
  date: string;
  customer_name: string;
  pdf_url: string;
  uploaded_at: string;
  uploaded_by?: string;
  user?: number;
  user_email?: string;
  user_name?: string;
}

interface PaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Receipt[];
}

interface SummaryStats {
  total: number;
  totalAmount: number;
  invoice: number;
  refund: number;
  credit_note: number;
}

type SortOrder = "newest" | "oldest";
type FilterType = "all" | ReceiptType;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCurrency(amount: string | number): string {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(num);
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const isToday = date.toDateString() === today.toDateString();
  const isYesterday = date.toDateString() === yesterday.toDateString();

  if (isToday) return "Today";
  if (isYesterday) return "Yesterday";

  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: date.getFullYear() !== today.getFullYear() ? "numeric" : undefined,
  });
}

function formatUploadedAt(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const TypeBadge: React.FC<{ type: ReceiptType; label: string }> = ({
  type,
  label,
}) => (
  <span className={`${styles.badge} ${styles[`badge_${type}`]}`}>{label}</span>
);

const SkeletonCard: React.FC = () => (
  <div className={styles.skeletonCard}>
    <div className={styles.skeletonHeader}>
      <div className={styles.skeletonBadge} />
      <div className={styles.skeletonDate} />
    </div>
    <div className={styles.skeletonName} />
    <div className={styles.skeletonAmount} />
    <div className={styles.skeletonBtn} />
  </div>
);

const StatCard: React.FC<{
  label: string;
  value: string | number;
  sub?: string;
  accent: "purple" | "gold" | "teal" | "navy";
  icon: React.ReactNode;
}> = ({ label, value, sub, accent, icon }) => (
  <div className={`${styles.statCard} ${styles[`statCard_${accent}`]}`}>
    <div className={styles.statIcon}>{icon}</div>
    <div className={styles.statBody}>
      <span className={styles.statLabel}>{label}</span>
      <span className={styles.statValue}>{value}</span>
      {sub && <span className={styles.statSub}>{sub}</span>}
    </div>
  </div>
);

// ─── Icons ────────────────────────────────────────────────────────────────────

const IconDownload = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const IconSearch = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const IconReceipt = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const IconAmount = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const IconInvoice = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const IconRefund = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.51 15a9 9 0 1 0 .49-3.51" />
  </svg>
);

const IconEmpty = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="9" y1="15" x2="15" y2="15" />
  </svg>
);

const IconChevron = ({ direction }: { direction: "left" | "right" }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {direction === "left" ? (
      <polyline points="15 18 9 12 15 6" />
    ) : (
      <polyline points="9 18 15 12 9 6" />
    )}
  </svg>
);

const IconSort = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19 12 12 19 5 12" />
  </svg>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const PAGE_SIZE = 10;

const Receipts: React.FC = () => {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [stats, setStats] = useState<SummaryStats | null>(null);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  const debouncedSearch = useDebounce(searchTerm, 350);
  const abortRef = useRef<AbortController | null>(null);

  // ── Fetch receipts ──
  const fetchReceipts = useCallback(async () => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const params: Record<string, string | number> = {
        page: currentPage,
        page_size: PAGE_SIZE,
      };
      if (filterType !== "all") params.type = filterType;
      if (debouncedSearch.trim()) params.customer = debouncedSearch.trim();

      const data = await api.get<PaginatedResponse>("/receipts/", { params });
      
      console.log("📄 Receipts API response:", data);

      let results = [...(data.results || [])];
      if (sortOrder === "oldest") {
        results.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      }

      setReceipts(results);
      setTotalCount(data.count || 0);
    } catch (err: any) {
      console.error("Fetch receipts error:", err);
      if (err.name !== "CanceledError") {
        setError(err.message || "Failed to load receipts. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }, [currentPage, filterType, debouncedSearch, sortOrder]);

  // ── Fetch all-time stats (page 1, large page_size, no filter) ──
  const fetchStats = useCallback(async () => {
    try {
      const data = await api.get<PaginatedResponse>("/receipts/", {
        params: { page: 1, page_size: 500 },
      });
      const all = data.results || [];
      const s: SummaryStats = {
        total: data.count || 0,
        totalAmount: all.reduce((sum, r) => sum + parseFloat(r.amount), 0),
        invoice: all.filter((r) => r.type === "invoice").length,
        refund: all.filter((r) => r.type === "refund").length,
        credit_note: all.filter((r) => r.type === "credit_note").length,
      };
      setStats(s);
    } catch (err) {
      console.error("Fetch stats error:", err);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterType, debouncedSearch, sortOrder]);

  useEffect(() => {
    fetchReceipts();
    return () => abortRef.current?.abort();
  }, [fetchReceipts]);

  // ── Download handler with authentication ──
  const handleDownload = async (receipt: Receipt) => {
    setDownloadingId(receipt.id);
    try {
      const token = localStorage.getItem('access_token') || localStorage.getItem('token');
      
      if (!token) {
        console.error("No token found");
        setError("Please log in again to download receipts.");
        return;
      }
      
      let downloadUrl = receipt.pdf_url;
      if (!downloadUrl.endsWith('/')) {
        downloadUrl += '/';
      }
      if (downloadUrl.includes('?format=api')) {
        downloadUrl = downloadUrl.replace('?format=api', '');
      }
      
      console.log("Downloading from URL:", downloadUrl);
      
      const response = await fetch(downloadUrl, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`Download failed: ${response.status}`);
      }
      
      const contentType = response.headers.get('Content-Type');
      if (!contentType || !contentType.includes('application/pdf')) {
        throw new Error('Server returned HTML instead of PDF');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `receipt_${receipt.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      console.log("Download successful");
      
    } catch (err) {
      console.error("Download error:", err);
      setError("Failed to download PDF. Please try again.");
    } finally {
      setTimeout(() => setDownloadingId(null), 800);
    }
  };

  // ── Pagination ──
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const filterTabs: { key: FilterType; label: string }[] = [
    { key: "all", label: "All" },
    { key: "invoice", label: "Invoices" },
    { key: "refund", label: "Refunds" },
    { key: "credit_note", label: "Credit Notes" },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderLeft}>
          <h1 className={styles.pageTitle}>Receipts</h1>
          <p className={styles.pageSubtitle}>
            View and download your financial documents
          </p>
        </div>
        <div className={styles.totalBadge}>
          {totalCount} document{totalCount !== 1 ? "s" : ""}
        </div>
      </div>

      {stats && (
        <div className={styles.statsGrid}>
          <StatCard
            label="Total Receipts"
            value={stats.total}
            accent="navy"
            icon={<IconReceipt />}
          />
          <StatCard
            label="Total Amount"
            value={formatCurrency(stats.totalAmount)}
            accent="gold"
            icon={<IconAmount />}
          />
          <StatCard
            label="Invoices"
            value={stats.invoice}
            accent="purple"
            icon={<IconInvoice />}
          />
          <StatCard
            label="Refunds"
            value={stats.refund}
            sub={`${stats.credit_note} credit note${stats.credit_note !== 1 ? "s" : ""}`}
            accent="teal"
            icon={<IconRefund />}
          />
        </div>
      )}

      <div className={styles.controls}>
        <div className={styles.filterTabs}>
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              className={`${styles.filterTab} ${filterType === tab.key ? styles.filterTabActive : ""}`}
              onClick={() => setFilterType(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className={styles.controlsRight}>
          <div className={styles.searchWrap}>
            <span className={styles.searchIcon}>
              <IconSearch />
            </span>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search by customer…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className={styles.searchClear}
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          <button
            className={styles.sortBtn}
            onClick={() =>
              setSortOrder((prev) =>
                prev === "newest" ? "oldest" : "newest"
              )
            }
            title={`Sorted: ${sortOrder}`}
          >
            <IconSort />
            <span>{sortOrder === "newest" ? "Newest" : "Oldest"}</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className={styles.grid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : error ? (
        <div className={styles.errorState}>
          <p className={styles.errorText}>{error}</p>
          <button className={styles.retryBtn} onClick={fetchReceipts}>
            Try again
          </button>
        </div>
      ) : receipts.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <IconEmpty />
          </div>
          <p className={styles.emptyTitle}>No receipts found</p>
          <p className={styles.emptySubtitle}>
            {searchTerm || filterType !== "all"
              ? "Try adjusting your filters or search term."
              : "Your receipts will appear here once uploaded."}
          </p>
          {(searchTerm || filterType !== "all") && (
            <button
              className={styles.retryBtn}
              onClick={() => {
                setSearchTerm("");
                setFilterType("all");
              }}
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <>
          <div className={styles.grid}>
            {receipts.map((receipt) => (
              <div key={receipt.id} className={styles.card}>
                <div className={styles.cardTop}>
                  <TypeBadge
                    type={receipt.type}
                    label={receipt.type_display}
                  />
                  <span className={styles.cardDate}>
                    {formatDate(receipt.date)}
                  </span>
                </div>

                <div className={styles.cardMid}>
                  <p className={styles.cardCustomer}>{receipt.customer_name}</p>
                  <p className={styles.cardAmount}>
                    {formatCurrency(receipt.amount)}
                  </p>
                </div>

                <div className={styles.cardMeta}>
                  <span className={styles.cardMetaText}>
                    Uploaded {formatUploadedAt(receipt.uploaded_at)}
                  </span>
                </div>

                <button
                  className={`${styles.downloadBtn} ${downloadingId === receipt.id ? styles.downloadBtnActive : ""}`}
                  onClick={() => handleDownload(receipt)}
                  disabled={downloadingId === receipt.id}
                >
                  <IconDownload />
                  <span>
                    {downloadingId === receipt.id ? "Opening…" : "Download PDF"}
                  </span>
                </button>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                className={styles.pageBtn}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <IconChevron direction="left" />
              </button>

              <div className={styles.pageNumbers}>
                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                  let page: number;
                  if (totalPages <= 7) {
                    page = i + 1;
                  } else if (currentPage <= 4) {
                    page = i + 1;
                  } else if (currentPage >= totalPages - 3) {
                    page = totalPages - 6 + i;
                  } else {
                    page = currentPage - 3 + i;
                  }
                  return (
                    <button
                      key={page}
                      className={`${styles.pageNum} ${currentPage === page ? styles.pageNumActive : ""}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <button
                className={styles.pageBtn}
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                <IconChevron direction="right" />
              </button>

              <span className={styles.pageInfo}>
                {(currentPage - 1) * PAGE_SIZE + 1}–
                {Math.min(currentPage * PAGE_SIZE, totalCount)} of {totalCount}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Receipts;