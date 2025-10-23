using AutoMapper;
using backend.DTOs;
using backend.Interfaces;
using backend.Models;

namespace backend.Services
{
    public class AlunoService : IAlunoService
    {
        private readonly IAlunoRepository _repository;
        private readonly IMapper _mapper;

        public AlunoService(IAlunoRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<AlunoDTO>> GetAllAsync()
        {
            var alunos = await _repository.GetAllAsync();
            return _mapper.Map<IEnumerable<AlunoDTO>>(alunos);
        }

        public async Task<AlunoDTO?> GetByIdAsync(int id)
        {
            var aluno = await _repository.GetByIdAsync(id);
            return _mapper.Map<AlunoDTO?>(aluno);
        }

        public async Task<AlunoDTO> CreateAsync(AlunoDTO alunoDto)
        {
            var aluno = _mapper.Map<Aluno>(alunoDto);
            var created = await _repository.CreateAsync(aluno);
            return _mapper.Map<AlunoDTO>(created);
        }

        public async Task<AlunoDTO?> UpdateAsync(int id, AlunoDTO alunoDto)
        {
            var aluno = _mapper.Map<Aluno>(alunoDto);
            aluno.IdAluno = id;
            var updated = await _repository.UpdateAsync(aluno);
            return _mapper.Map<AlunoDTO?>(updated);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _repository.DeleteAsync(id);
        }
    }
}
