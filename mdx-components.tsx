import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import Link from 'next/link';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Custom heading components with anchor links
    h1: ({ children, ...props }) => (
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 font-display" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 className="text-2xl md:text-3xl font-bold text-white mt-8 mb-4 font-display" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="text-xl md:text-2xl font-semibold text-white mt-6 mb-3" {...props}>
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4 className="text-lg md:text-xl font-semibold text-destiny-gray-200 mt-4 mb-2" {...props}>
        {children}
      </h4>
    ),

    // Custom paragraph styling
    p: ({ children, ...props }) => (
      <p className="text-destiny-gray-300 mb-4 leading-relaxed" {...props}>
        {children}
      </p>
    ),

    // Custom link styling
    a: ({ children, href, ...props }) => {
      const isExternal = href?.startsWith('http');
      const Component = isExternal ? 'a' : Link;
      const linkProps = isExternal
        ? { href, target: '_blank', rel: 'noopener noreferrer' }
        : { href: href || '' };

      return (
        <Component
          {...linkProps}
          className="text-destiny-primary hover:text-destiny-accent-solar transition-colors duration-200 font-medium underline decoration-destiny-primary/50 hover:decoration-destiny-accent-solar underline-offset-2"
          {...props}
        >
          {children}
        </Component>
      );
    },

    // Custom list styling
    ul: ({ children, ...props }) => (
      <ul className="list-disc list-inside text-destiny-gray-300 mb-4 space-y-2 ml-4" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="list-decimal list-inside text-destiny-gray-300 mb-4 space-y-2 ml-4" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="mb-1" {...props}>
        {children}
      </li>
    ),

    // Custom blockquote styling
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="border-l-4 border-destiny-primary bg-destiny-gray-800/50 p-4 my-6 italic text-destiny-gray-300"
        {...props}
      >
        {children}
      </blockquote>
    ),

    // Custom code styling
    code: ({ children, className, ...props }) => {
      const isInline = !className?.includes('language-');

      if (isInline) {
        return (
          <code
            className="bg-destiny-gray-800 text-destiny-accent-solar px-2 py-1 rounded text-sm font-mono"
            {...props}
          >
            {children}
          </code>
        );
      }

      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },

    // Custom pre styling for code blocks
    pre: ({ children, ...props }) => (
      <pre
        className="bg-destiny-gray-900 border border-destiny-gray-700 rounded-lg p-4 mb-6 overflow-x-auto text-sm"
        {...props}
      >
        {children}
      </pre>
    ),

    // Custom table styling
    table: ({ children, ...props }) => (
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-destiny-gray-300 border-collapse" {...props}>
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }) => (
      <thead className="bg-destiny-gray-800" {...props}>
        {children}
      </thead>
    ),
    th: ({ children, ...props }) => (
      <th className="border border-destiny-gray-700 px-4 py-2 text-left font-semibold text-white" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="border border-destiny-gray-700 px-4 py-2" {...props}>
        {children}
      </td>
    ),

    // Custom image component with optimization
    img: ({ src, alt, ...props }) => (
      <div className="my-6">
        <Image
          src={src || ''}
          alt={alt || ''}
          width={800}
          height={400}
          className="rounded-lg shadow-lg mx-auto"
          {...props}
        />
        {alt && (
          <p className="text-center text-sm text-destiny-gray-500 mt-2 italic">
            {alt}
          </p>
        )}
      </div>
    ),

    // Custom horizontal rule
    hr: ({ ...props }) => (
      <hr className="border-destiny-gray-700 my-8" {...props} />
    ),

    // Custom components for builds and guides
    BuildCard: ({ title, weapons, exoticArmor, gameMode, difficulty, ...props }) => (
      <div className="card my-6" {...props}>
        <h4 className="text-xl font-semibold text-white mb-3">{title}</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="text-sm font-semibold text-destiny-gray-300 mb-2">Weapons</h5>
            <ul className="text-sm space-y-1">
              {weapons?.kinetic && (
                <li className="flex justify-between">
                  <span className="text-destiny-gray-400">Kinetic:</span>
                  <span className="text-white">{weapons.kinetic}</span>
                </li>
              )}
              {weapons?.energy && (
                <li className="flex justify-between">
                  <span className="text-destiny-gray-400">Energy:</span>
                  <span className="text-white">{weapons.energy}</span>
                </li>
              )}
              {weapons?.power && (
                <li className="flex justify-between">
                  <span className="text-destiny-gray-400">Power:</span>
                  <span className="text-white">{weapons.power}</span>
                </li>
              )}
            </ul>
          </div>
          <div>
            <h5 className="text-sm font-semibold text-destiny-gray-300 mb-2">Details</h5>
            <ul className="text-sm space-y-1">
              {exoticArmor && (
                <li className="flex justify-between">
                  <span className="text-destiny-gray-400">Exotic:</span>
                  <span className="text-destiny-accent-solar">{exoticArmor}</span>
                </li>
              )}
              {gameMode && (
                <li className="flex justify-between">
                  <span className="text-destiny-gray-400">Mode:</span>
                  <span className="text-white">{gameMode.toUpperCase()}</span>
                </li>
              )}
              {difficulty && (
                <li className="flex justify-between">
                  <span className="text-destiny-gray-400">Difficulty:</span>
                  <span className="text-white capitalize">{difficulty}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    ),

    InfoBox: ({ type = 'info', children, ...props }) => {
      const typeStyles = {
        info: 'border-blue-500 bg-blue-500/10 text-blue-400',
        warning: 'border-yellow-500 bg-yellow-500/10 text-yellow-400',
        error: 'border-red-500 bg-red-500/10 text-red-400',
        success: 'border-green-500 bg-green-500/10 text-green-400',
      };

      const icons = {
        info: 'ℹ️',
        warning: '⚠️',
        error: '❌',
        success: '✅',
      };

      return (
        <div className={`border-l-4 p-4 my-6 ${typeStyles[type]}`} {...props}>
          <div className="flex items-start gap-3">
            <span className="text-lg">{icons[type]}</span>
            <div className="flex-1">{children}</div>
          </div>
        </div>
      );
    },

    ...components,
  };
}