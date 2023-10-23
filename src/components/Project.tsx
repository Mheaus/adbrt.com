import * as React from 'react';

interface ProjectProps {
  name: string;
  status: string;
  description: string;
}

const Project: React.FC<ProjectProps> = (props) => {
  const { name = '', status = '', description = '' } = props;

  return (
    <div className="bg-gray-100 rounded-sm shadow-md my-2 py-4 px-2 w-full">
      <p className="opacity-70 text-primary">
        {name}
        <span className="italic mx-4 text-secondary">{status}</span>
      </p>
      <p className="text-xs my-2 mx-1 opacity-75">{description}</p>
    </div>
  );
};

export default Project;
