import { render, screen, fireEvent } from '@testing-library/react';
import Tutorials, { TutorialProps } from '../tutorials';
import { setupAPIClient } from '../../services/api';
import '@testing-library/jest-dom';


//mockando do setupAPIClient para evitar chamadas reais à API
/*jest.mock('../../services/api', () => ({
  setupAPIClient: jest.fn(() => ({
    get: jest.fn().mockResolvedValue({ data: [] })
  }))
}));*/
jest.mock('../../services/api', () => ({
    setupAPIClient: jest.fn((ctx) => ({
      get: jest.fn().mockResolvedValue({ data: [] }),
    }))
  }));
  

const mockTutorials: TutorialProps[] = [
  { id: '1', status: true, tutorial_id: '1', name: 'React Basics', content: 'Learn React', creator: 'Nathalia' },
];

describe('Tutorials Page', () => {
  it('render search inputs correctly', () => {
    render(<Tutorials tutorials={mockTutorials} />);

    //verifica os inputs de busca
    expect(screen.getByPlaceholderText('Buscar por Título')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Buscar por Criador')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Buscar por Palavras-chave')).toBeInTheDocument();
  });

  it('update search input values correctly', () => {
    render(<Tutorials tutorials={mockTutorials} />);

    const titleInput = screen.getByPlaceholderText('Buscar por Título') as HTMLInputElement;
    const creatorInput = screen.getByPlaceholderText('Buscar por Criador') as HTMLInputElement;
    const keywordsInput = screen.getByPlaceholderText('Buscar por Palavras-chave') as HTMLInputElement;

    fireEvent.change(titleInput, { target: { value: 'React' } });
    fireEvent.change(creatorInput, { target: { value: 'Nathalia' } });
    fireEvent.change(keywordsInput, { target: { value: 'JavaScript' } });

    expect(titleInput.value).toBe('React');
    expect(creatorInput.value).toBe('Nathalia');
    expect(keywordsInput.value).toBe('JavaScript');
  });

  it('should call handleFilterTutorial when search button is clicked', async () => {
    render(<Tutorials tutorials={mockTutorials} />);

    const searchButton = screen.getByText('Buscar');
    
    fireEvent.click(searchButton);

  
    expect(setupAPIClient(undefined).get).toHaveBeenCalledWith('/tutorial', {
      params: {
        title: '',
        creator: '',
        keywords: '',
      },
    });
  });
});
