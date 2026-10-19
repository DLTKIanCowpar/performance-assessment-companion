"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/persistence/store";
import { BookOpen, ClipboardList, FileText, ArrowRight } from "lucide-react";

export default function HomePage() {
  const { firstRunComplete, profile } = useStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (mounted && firstRunComplete && profile) {
      router.replace("/overview");
    }
  }, [mounted, firstRunComplete, profile, router]);

  if (!mounted) return null;
  if (firstRunComplete && profile) return null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f9fb] px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#0d9488] mb-3">
            Deltek Product & Technology
          </p>
          <h1 className="text-3xl font-bold text-[#1e3a8a] leading-tight">
            Prepare your 2026 Performance Assessment
          </h1>
          <p className="mt-4 text-[#4b5563] leading-relaxed">
            This workspace helps you understand expectations for your role and level, collect evidence from the assessment period, and prepare thoughtful responses for the official assessment.
          </p>
          <p className="mt-2 text-sm text-[#6b7280]">
            Your work stays in this browser unless you export or clear it.
          </p>
        </div>

        {/* Cards */}
        <div className="space-y-3 mb-8">
          {[
            {
              icon: <ClipboardList size={20} className="text-[#1e3a8a]" />,
              title: "Understand the questions",
              desc: "Review the official assessment structure and guidance for your role and level.",
            },
            {
              icon: <BookOpen size={20} className="text-[#1e3a8a]" />,
              title: "Gather your evidence",
              desc: "Capture goals, outcomes, decisions, examples, and changed conditions from the full period.",
            },
            {
              icon: <FileText size={20} className="text-[#1e3a8a]" />,
              title: "Prepare your responses",
              desc: "Turn your evidence into drafts you can review and enter into the official system.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="flex items-start gap-3 rounded-lg border border-[#e5e7eb] bg-white px-4 py-4"
            >
              <div className="mt-0.5 flex-shrink-0 rounded-md bg-[#eff6ff] p-2">
                {card.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-[#111827]">{card.title}</p>
                <p className="text-sm text-[#6b7280] mt-0.5">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-3">
          <StartButton />
          <p className="text-xs text-[#9ca3af]">
            No account required · No data leaves your browser
          </p>
        </div>
      </div>
    </div>
  );
}

function StartButton() {
  const { completeFirstRun } = useStore();
  const router = useRouter();

  const handleStart = () => {
    router.push("/profile");
  };

  return (
    <button
      onClick={handleStart}
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#1e3a8a] px-6 py-3.5 text-base font-semibold text-white hover:bg-[#1e40af] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e3a8a]"
    >
      Start preparing
      <ArrowRight size={18} />
    </button>
  );
}
