using Backend.Models;
using MySql.Data.MySqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Data.Common;

namespace Backend.DAO
{
    public class AlunoDao : IAlunoDao
    {
        private readonly string _connectionString;

        public AlunoDao(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection")
                                ?? throw new ArgumentNullException("Connection string 'DefaultConnection' not found.");
        }

        private MySqlConnection GetConnection() => new MySqlConnection(_connectionString);

        public async Task<IEnumerable<Aluno>> GetAllAsync()
        {
            var list = new List<Aluno>();
            using var conn = GetConnection();
            await conn.OpenAsync();

            var cmd = conn.CreateCommand();
            cmd.CommandText = @"SELECT idAluno, nome, email, cpf, rg, endereco, curso, senha, saldoMoedas, criadoEm 
                                FROM tb_alunos ORDER BY idAluno;";

            using DbDataReader reader = await cmd.ExecuteReaderAsync();
            while (await reader.ReadAsync())
            {
                list.Add(MapReader(reader));
            }

            return list;
        }

        public async Task<Aluno?> GetByIdAsync(int id)
        {
            using var conn = GetConnection();
            await conn.OpenAsync();

            var cmd = conn.CreateCommand();
            cmd.CommandText = @"SELECT idAluno, nome, email, cpf, rg, endereco, curso, senha, saldoMoedas, criadoEm 
                                FROM tb_alunos WHERE idAluno = @id LIMIT 1;";
            cmd.Parameters.AddWithValue("@id", id);

            using DbDataReader reader = await cmd.ExecuteReaderAsync();
            if (await reader.ReadAsync())
                return MapReader(reader);

            return null;
        }

        public async Task<int> CreateAsync(Aluno aluno)
        {
            using var conn = GetConnection();
            await conn.OpenAsync();

            var cmd = conn.CreateCommand();
            cmd.CommandText = @"
                INSERT INTO tb_alunos (nome, email, cpf, rg, endereco, curso, senha, saldoMoedas)
                VALUES (@nome, @email, @cpf, @rg, @endereco, @curso, @senha, @saldoMoedas);
                SELECT LAST_INSERT_ID();";

            cmd.Parameters.AddWithValue("@nome", aluno.Nome);
            cmd.Parameters.AddWithValue("@email", aluno.Email);
            cmd.Parameters.AddWithValue("@cpf", (object?)aluno.Cpf ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@rg", (object?)aluno.Rg ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@endereco", (object?)aluno.Endereco ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@curso", (object?)aluno.Curso ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@senha", aluno.Senha);
            cmd.Parameters.AddWithValue("@saldoMoedas", aluno.SaldoMoedas);

            var result = await cmd.ExecuteScalarAsync();
            return Convert.ToInt32(result);
        }

        public async Task<bool> UpdateAsync(int id, Aluno aluno)
        {
            using var conn = GetConnection();
            await conn.OpenAsync();

            var cmd = conn.CreateCommand();
            cmd.CommandText = @"
                UPDATE tb_alunos
                SET nome = @nome,
                    email = @email,
                    cpf = @cpf,
                    rg = @rg,
                    endereco = @endereco,
                    curso = @curso,
                    senha = @senha,
                    saldoMoedas = @saldoMoedas
                WHERE idAluno = @id;";

            cmd.Parameters.AddWithValue("@nome", aluno.Nome);
            cmd.Parameters.AddWithValue("@email", aluno.Email);
            cmd.Parameters.AddWithValue("@cpf", (object?)aluno.Cpf ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@rg", (object?)aluno.Rg ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@endereco", (object?)aluno.Endereco ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@curso", (object?)aluno.Curso ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@senha", aluno.Senha);
            cmd.Parameters.AddWithValue("@saldoMoedas", aluno.SaldoMoedas);
            cmd.Parameters.AddWithValue("@id", id);

            var affected = await cmd.ExecuteNonQueryAsync();
            return affected > 0;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            using var conn = GetConnection();
            await conn.OpenAsync();

            var cmd = conn.CreateCommand();
            cmd.CommandText = "DELETE FROM tb_alunos WHERE idAluno = @id;";
            cmd.Parameters.AddWithValue("@id", id);

            var affected = await cmd.ExecuteNonQueryAsync();
            return affected > 0;
        }

        private Aluno MapReader(DbDataReader reader)
        {
            return new Aluno
            {
                IdAluno = reader.GetInt32(reader.GetOrdinal("idAluno")),
                Nome = reader.GetString(reader.GetOrdinal("nome")),
                Email = reader.GetString(reader.GetOrdinal("email")),
                Cpf = reader.IsDBNull(reader.GetOrdinal("cpf")) ? null : reader.GetString(reader.GetOrdinal("cpf")),
                Rg = reader.IsDBNull(reader.GetOrdinal("rg")) ? null : reader.GetString(reader.GetOrdinal("rg")),
                Endereco = reader.IsDBNull(reader.GetOrdinal("endereco")) ? null : reader.GetString(reader.GetOrdinal("endereco")),
                Curso = reader.IsDBNull(reader.GetOrdinal("curso")) ? null : reader.GetString(reader.GetOrdinal("curso")),
                Senha = reader.GetString(reader.GetOrdinal("senha")),
                SaldoMoedas = reader.IsDBNull(reader.GetOrdinal("saldoMoedas")) ? 0.0 : reader.GetDouble(reader.GetOrdinal("saldoMoedas")),
                CriadoEm = reader.IsDBNull(reader.GetOrdinal("criadoEm")) ? null : reader.GetDateTime(reader.GetOrdinal("criadoEm"))
            };
        }
    }
}
