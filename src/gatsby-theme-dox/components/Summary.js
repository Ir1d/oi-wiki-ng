/** @jsx jsx */
import { Link as GatsbyLink } from 'gatsby'
import { jsx } from 'theme-ui'
import NoteIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function({ className = '', children, ...props }){
    if(className.match('note')){
        return (
            <summary className={className} {...props}
                sx={{
                    margin: '0 -0.6rem',
                    padding: '.7rem .6rem .7rem 1rem',
                    borderBottom: '.05rem solid rgba(68,138,255,.1)',
                    backgroundColor: 'rgba(68,138,255,.1)',
                    fontWeight: 700,
                    outline: 'none',
                    cursor: 'pointer',
                    p: {
                        display: 'inline-block',
                        margin: 0
                    },
                    '::-webkit-details-marker': {
                        display: 'none'
                    }
                }}
            >
                <NoteIcon 
                    sx={{
                        verticalAlign: '-4px',
                        mr: '0.6rem'
                    }}
                />
                {children}
                <ExpandMoreIcon 
                    className='expand-more-icon'
                    sx={{
                        verticalAlign: '-4px',
                        ml: '1rem',
                        float: 'right'
                    }}
                />
            </summary>
        )
    }
    return (
        <summary className={className} {...props} >
            {children}
        </summary>
    )
}



