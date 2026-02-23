import { useEffect } from "react";
import { X } from "lucide-react";

function PolicyModal({ isOpen, onClose }) {
    // Handle ESC key
    useEffect(() => {
        function handleKeyDown(e) {
            if (e.key === "Escape") {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-2xl bg-light rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="policy-modal-title"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <h2 id="policy-modal-title" className="text-xl font-bold text-primary">
                        Refund & Return Policy
                    </h2>
                    <button
                        onClick={onClose}
                        type="button"
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <X size={24} className="text-gray-500" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto">
                    <div dir="rtl" className="mb-8 text-right font-arabic">
                        <h3 className="text-lg font-bold text-primary mb-3 border-b pb-2 inline-block">
                            سياسة الاسترجاع والاستبدال
                        </h3>
                        <ul className="space-y-3 text-sm text-gray-700 leading-relaxed list-disc list-inside">
                            <li>
                                <span className="font-semibold text-gray-900">شروط الاسترجاع:</span> يحق للعميل طلب استرجاع المنتج خلال 14 يوماً من تاريخ الاستلام، بشرط أن يكون المنتج في حالته الأصلية وبتغليفه الأصلي.
                            </li>
                            <li>
                                <span className="font-semibold text-gray-900">المنتجات غير القابلة للإرجاع:</span> لا يمكن إرجاع المنتجات التي تم فتحها أو استخدامها أو المنتجات الرقمية (مثل كود فحص IMEI) بمجرد تفعيلها.
                            </li>
                            <li>
                                <span className="font-semibold text-gray-900">طريقة الاسترداد:</span> يتم رد المبلغ عبر نفس وسيلة الدفع الأصلية خلال 7 إلى 14 يوم عمل بعد فحص المنتج.
                            </li>
                            <li>
                                <span className="font-semibold text-gray-900">رسوم الشحن:</span> يتحمل العميل تكاليف شحن الإرجاع إلا في حالة وجود عيب مصنعي أو خطأ في الطلب.
                            </li>
                        </ul>
                    </div>

                    <div dir="ltr" className="text-left">
                        <h3 className="text-lg font-bold text-primary mb-3 border-b pb-2 inline-block">
                            Refund & Return Policy
                        </h3>
                        <ul className="space-y-3 text-sm text-gray-700 leading-relaxed list-disc list-inside">
                            <li>
                                <span className="font-semibold text-gray-900">Eligibility:</span> Returns are accepted within 14 days of delivery. Items must be unused, in their original packaging, and in the same condition as received.
                            </li>
                            <li>
                                <span className="font-semibold text-gray-900">Non-Returnable Items:</span> Opened/used accessories and digital services (like IMEI reports) are non-refundable once processed.
                            </li>
                            <li>
                                <span className="font-semibold text-gray-900">Refund Process:</span> Refunds will be issued to the original payment method within 7–14 business days after inspecting the returned item.
                            </li>
                            <li>
                                <span className="font-semibold text-gray-900">Shipping Costs:</span> Customers are responsible for return shipping fees unless the product is defective or incorrect.
                            </li>
                        </ul>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default PolicyModal;
