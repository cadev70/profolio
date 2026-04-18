import mazeImg from '../assets/images/maze-snapshot.png'
import newsSpaImg from '../assets/images/news-spa-snapshot.png'
import newsCrawlerImg from '../assets/images/news-crawler.png'
import rotationHelperImg from '../assets/images/rotation-helper-snapshot.png'

const projectImageMap = {
  1: mazeImg,
  2: newsSpaImg,
  3: newsCrawlerImg,
  4: rotationHelperImg,
}

const fallbackGradients = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
]

export function useProjectImage() {
  const getProjectImage = (project, index) => {
    const img = projectImageMap[project.id]
    return img
      ? { backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }
      : { background: fallbackGradients[index % fallbackGradients.length] }
  }

  return { getProjectImage }
}
