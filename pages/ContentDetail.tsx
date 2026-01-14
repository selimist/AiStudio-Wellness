
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { dataService } from '../services/dataService';

const ContentDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = dataService.getContentBySlug(slug || '');

  if (!article) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-stone-900">Article not found</h2>
        <Link to="/content" className="text-teal-600 hover:underline mt-4 inline-block">Return to Journal</Link>
      </div>
    );
  }

  return (
    <article className="pb-20">
      <div className="max-w-4xl mx-auto px-4 pt-16">
        <Link to="/content" className="inline-flex items-center text-stone-500 hover:text-teal-600 mb-8 transition">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          Back to Journal
        </Link>
        
        <div className="flex gap-2 mb-6">
          {article.tags.map(tag => (
            <span key={tag} className="text-xs font-bold text-teal-600 uppercase tracking-widest">{tag}</span>
          ))}
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 leading-tight mb-8">
          {article.title}
        </h1>
        
        <div className="flex items-center justify-between py-6 border-y border-stone-200 mb-12">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center font-bold">
              {article.author[0]}
            </div>
            <div>
              <div className="font-bold text-stone-900">{article.author}</div>
              <div className="text-stone-400 text-sm">{new Date(article.publishedAt).toLocaleDateString()} &bull; {article.readingTime} read</div>
            </div>
          </div>
          <div className="flex space-x-4">
            <button className="p-2 text-stone-400 hover:text-teal-600 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
            </button>
          </div>
        </div>

        <div className="aspect-[21/9] rounded-3xl overflow-hidden mb-12 shadow-sm">
          <img 
            src={article.coverImage} 
            alt={article.title} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose prose-stone lg:prose-xl max-w-none">
          <p className="text-xl text-stone-600 leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:text-stone-900 first-letter:mr-3 first-letter:float-left mb-8">
            {article.content}
          </p>
          <div className="space-y-6 text-stone-600 leading-relaxed text-lg">
            <p>
              In our fast-paced society, finding a moment of silence is a form of rebellion. We often confuse "doing" with "living," forgetting that the most profound insights often emerge when we simply allow ourselves to "be."
            </p>
            <h2 className="text-2xl font-bold text-stone-900 mt-12 mb-4">Practical Steps for Modern Life</h2>
            <p>
              To start integrating these practices, one doesn't need to relocate to a monastery or commit to hours of sitting. It starts with the micro-moments. The breath between emails, the intentional taste of your morning coffee, or the feeling of your feet on the ground as you walk to your car.
            </p>
            <blockquote className="border-l-4 border-teal-500 pl-6 italic text-2xl text-stone-900 font-medium my-12 py-2 bg-stone-50 rounded-r-lg">
              "The present moment is filled with joy and happiness. If you are attentive, you will see it."
            </blockquote>
            <p>
              Wellness is not a destination. It is the quality of the journey. By choosing experiences that resonate with our soul, we nourish our deepest selves.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ContentDetail;
