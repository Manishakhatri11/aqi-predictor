import { techStack } from "../../data/techStack";
export default function TechnologyStack() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800">Technology Stack</h2>
        <div className="mx-auto mt-3 h-1 w-16 rounded bg-accent"></div>

        {/* Cards */}
        <div className="mt-12 flex flex-wrap justify-center gap-8">
          {techStack.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="sm:w-56 rounded-2xl bg-white p-8 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/20">
                  <Icon className="text-2xl text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
