using AutoMapper;
using backend.DTOs;
using backend.Models;

namespace backend.Profiles
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            // CRUD de usuários
            CreateMap<Aluno, AlunoDTO>().ReverseMap();
            CreateMap<EmpresaParceira, EmpresaParceiraDTO>().ReverseMap();

        }
    }
}