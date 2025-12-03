type VantagesProps = {
    title: string;
    point1: string;
    point2: string;
    point3: string;
};

export default function Vantages({ title, point1, point2, point3 }: VantagesProps) {
    return (
        <div className="p-4 text-white  rounded-3xl bg-neutral-900 border-1 border-neutral-700 m-4">
            <h2 className="flex items-center just text-xl font-semibold mb-2">{title}</h2>
            <ul className="list-disc list-inside space-y-1">
                <li>{point1}</li>
                <li>{point2}</li>
                <li>{point3}</li>
            </ul>
        </div>
    );
}
