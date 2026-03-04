
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import appwriteService from '../appwrite/config' 

function PostCard({ $id, title, featuredImage, content, author, $createdAt, status }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Strip HTML tags and truncate content
  const truncateContent = (htmlContent, maxLength = 100) => {
    const text = htmlContent?.replace(/<[^>]*>/g, '') || '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <Link to={`/post/${$id}`} className="block group">
      <div className="
        w-full bg-white rounded-xl shadow-sm
        hover:shadow-xl transition-all duration-300
        border border-gray-100 hover:border-blue-100
        overflow-hidden group-hover:scale-[1.02]
        h-full flex flex-col
      ">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gray-100">
          {featuredImage && !imageError ? (
            <>
              {/* Loading Skeleton */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
              )}
              
              <img
                src={appwriteService.getFileView(featuredImage)}
                alt={title}
                className={`
                  w-full h-48 object-cover transition-all duration-500
                  ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
                `}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            </>
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
              <div className="text-4xl text-gray-400">📝</div>
            </div>
          )}
          
          {/* Status Badge */}
          {status && (
            <div className={`
              absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium
              ${status === 'active' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
              }
            `}>
              {status === 'active' ? 'Published' : 'Draft'}
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Title */}
          <h2 className="
            text-xl font-bold text-gray-900 mb-2
            line-clamp-2 group-hover:text-blue-600
            transition-colors duration-200
          ">
            {title}
          </h2>

          {/* Excerpt */}
          {content && (
            <p className="
              text-gray-600 text-sm mb-3 line-clamp-3
              leading-relaxed flex-1
            ">
              {truncateContent(content, 120)}
            </p>
          )}

          {/* Footer */}
          <div className="mt-auto pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                {author && (
                  <>
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs">
                      {author.charAt(0).toUpperCase()}
                    </div>
                    <span>{author}</span>
                  </>
                )}
              </div>
              
              {$createdAt && (
                <span>{formatDate($createdAt)}</span>
              )}
            </div>
          </div>
        </div>

        {/* Hover Effect Indicator */}
        <div className="
          absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600
          group-hover:w-full transition-all duration-300
        " />
      </div>
    </Link>
  )
}

export default PostCard