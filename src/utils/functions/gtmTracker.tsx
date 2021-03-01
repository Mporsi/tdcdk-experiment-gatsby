export default function gtmTracker(category: string, action: string, label?: string, value?: number): void {
    const dataLayer = (window.dataLayer = window.dataLayer || []);
    if (dataLayer) {
        dataLayer.push({
            event: 'Generic Event Handler',
            category,
            action,
            label,
            value,
        });
    }
}
