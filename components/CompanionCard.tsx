"use client";
import { deleteCompanion } from "@/lib/actions/companion.actions";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

interface CompanionCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
  author?: string;
}

const CompanionCard = ({
  id,
  name,
  topic,
  subject,
  duration,
  color,
  author,
}: CompanionCardProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const [isDeleting, setIsDeleting] = useState(false);
  const isAuthor = user?.id === author;

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this companion?")) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteCompanion(id, pathname);
      router.refresh();
    } catch (error) {
      console.error('Failed to delete companion:', error);
      alert(error instanceof Error ? error.message : 'Failed to delete companion');
      setIsDeleting(false);
    }
  };

  return (
    <article className="companion-card" style={{ backgroundColor: color }}>
      <div className="flex justify-between items-center">
        <div className="subject-badge">{subject}</div>
        {isAuthor && (
          <button
            className="companion-bookmark"
            onClick={handleDelete}
            disabled={isDeleting}
            title="Delete companion"
          >
            <svg width="12.5" height="15" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 3.5H13M4.5 3.5V2.5C4.5 2.22386 4.72386 2 5 2H9C9.27614 2 9.5 2.22386 9.5 2.5V3.5M5.5 7.5V11.5M8.5 7.5V11.5M2.5 3.5L3 13.5C3 14.0523 3.44772 14.5 4 14.5H10C10.5523 14.5 11 14.0523 11 13.5L11.5 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>

      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="text-sm">{topic}</p>
      <div className="flex items-center gap-2">
        <Image
          src="/icons/clock.svg"
          alt="duration"
          width={13.5}
          height={13.5}
        />
        <p className="text-sm">{duration} minutes</p>
      </div>

      <Link href={`/companions/${id}`} className="w-full">
        <button className="btn-primary w-full justify-center">
          Launch Lesson
        </button>
      </Link>
    </article>
  );
};

export default CompanionCard;
