import { useParams } from 'react-router-dom';
import ViewSpecificAlbumReview from './ViewSpecificAlbumReview';
import ViewSpecificArtistReview from './ViewSpecificArtistReview';
import ViewSpecificTrackReview from './ViewSpecificTrackReview';


const ViewSpecificReview = () => {
    const { type, id } = useParams();
    
    const renderResults = ({type, id}) => {
        switch (type) {
            
            case 'albums':
                return <ViewSpecificAlbumReview id={id} />;
            case 'artists':
                return <ViewSpecificArtistReview id={id} />;
            case 'tracks':
                return <ViewSpecificTrackReview id={id} />;
            default:
                return <div>No review found</div>;
        }
    }
    
    return (

        <div className="view-specific-review">
            {renderResults({type, id})}
        </div>
    )
}

export default ViewSpecificReview;