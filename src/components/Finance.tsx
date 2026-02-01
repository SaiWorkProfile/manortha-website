import React from 'react';
import { IndianRupee, ArrowUpCircle, AlertCircle, FileText } from 'lucide-react';
import type { UserRole } from "../types";

interface FinanceProps {
  role: UserRole;
}

const Finance: React.FC<FinanceProps> = () => {
  return (
    <div className="space-y-8">
      {/* your JSX unchanged */}
    </div>
  );
};

export default Finance;
