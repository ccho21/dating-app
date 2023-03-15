using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }
        IMessageRepository MessageRepository { get; }
        ILikesRepository LikesRepository { get; }
        IProjectRepository ProjectRepository { get; }
        IExperienceRepository ExperienceRepository { get; }

        Task<bool> Complete();
        bool HasChanges();
    }
}